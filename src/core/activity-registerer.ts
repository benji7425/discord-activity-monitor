import { BotGuildMember, Client, Logger } from "disharmony";
import Guild from "../models/guild";
import Message from "../models/message";
import { TextChannel } from "discord.js";

export default class ActivityRegisterer
{
    public startListening()
    {
        this.client.onMessage.sub(message => this.registerActivity(message.guild, message.member, (message.djs.channel as TextChannel).name))
        this.client.djs.on("voiceStateUpdate", (oldMember, newMember) => 
            this.registerActivity(
                new Guild(newMember.guild),
                new BotGuildMember(newMember),
                (newMember.voiceChannel || oldMember.voiceChannel).name))
    }

    private async registerActivity(guild: Guild, member: BotGuildMember, channelName: String)
    {
        await guild.loadDocument()
        if (guild
            && member && member.id !== this.client.botId
            && this.isGuildSetUp(guild))
        {
            guild.users.set(member.id, new Date())
            await this.markActiveIfNotIgnored(guild, member, channelName)
            await guild.save()
        }
    }

    private async markActiveIfNotIgnored(guild: Guild, member: BotGuildMember, channelName: String)
    {
        try
        {
            if (this.isMemberIgnored(guild, member))
                return

            await member.djs.addRole(guild.activeRoleId, `Activity detected in ${channelName}.`);

            if (guild.inactiveRoleId && guild.inactiveRoleId !== "disabled")
                await member.removeRole(guild.inactiveRoleId)
        }
        catch (e)
        {
            Logger.debugLogError(`Error marking user ${member.username} active in guild ${guild.name}.`, e)
        }
    }

    private isMemberIgnored(guild: Guild, member: BotGuildMember)
    {
        const isIgnoredUser = guild.ignoredUserIds.indexOf(member.id) >= 0
        const hasIgnoredRole = guild.ignoredRoleIds.some(roleId => member.hasRole(roleId))
        return isIgnoredUser || hasIgnoredRole
    }

    private isGuildSetUp(guild: Guild)
    {
        return guild.allowRoleAddition && guild.activeRoleId && guild.activeRoleId.length > 0
    }

    constructor(
        private client: Client<Message>,
    ) { }
}