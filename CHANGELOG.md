# Changelog
## v4.2.1
### Updated
- Package versions for typescript and disharmony

## v4.2.0
### Added
- Script `monitor.js` to restart the bot daily (usage optional)
- Commands `import` and `export` for server data transfer
- Config option to set bot 'playing' status

## v4.1.3
### Fixed
- Invalid JSON in sample config file

## v4.1.2
### Updated
- Docker image to run with [forever](https://github.com/foreversd/forever)
- Buildkite pipeline to build Docker image

## v4.1.1
### Updated
- Activity registerer to not attempt to assign the active role to members who already have it

### Fixed
- Setup returning an error after completion if inactive role disabled
- Logs not always including guildId and memberId (where relevant)

## v4.1.0
### Added
- Measures to reduce processing and API calls for incorrectly configured role hierarchies
    - If the bot is lacking permissions to manage the active or inactive roles, members will not be processed
- Warnings after setup if either the active or inactive role are not manageable by the bot
- Logging of Discord API error code when failing to mark users active or inactive
- Configuration option for the culling interval used to process inactive members
- Unit tests for activity/inactivity rules

## v4.0.1
### Fixed
- No event log when member marked active

### Updated
- Module [disharmony](https://github.com/benji7425/disharmony)

## v4.0.0
Version 4.0 is a complete re-write of the bot using TypeScript and built on top of my [disharmony library](https://github.com/benji7425/disharmony).
This changelog entry does not assume knowledge of v3.5 or prior, and so list additions as if this is a new project.

### Added
- Integration with [disharmony](https://github.com/benji7425/disharmony)
- Command *setup* to configure parameters for the current server
- Command *view-config* to view current server configuration
- Addition of 'active' role to member when message or voice activity detected
- Removal of 'active' role from member after no activity detected for configured duration
- Optional addition of 'inactive' role when 'active' role removed
- Configurable option to ignore certain users/roles
- Audit log reason messages when roles are added/removed
- Event logging for some key events