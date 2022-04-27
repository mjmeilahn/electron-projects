# Electron Projects
Explores core Electron, capabilities and limitations of JS software.

TODO - Look into automating distributables for all operating systems (OS)

1. Screen Recorder - Fetches all open software apps, the user chooses which to record. When the recording is stopped an exportable file is created where the user can choose where it is saved locally on their computer.

2. Bare Bones Starter - All the files and folders you would need on an Electron project. This starter is a bare minimum, unopinionated solution. Important to use this version over Electron's Starter due it does not include necessary parts that belong in every Electron project.


### Abilities
- Front End Developers are able to use HTML, CSS, Browser and Server-Side JavaScript for creating desktop software applications.
- Easy to communicate with remote APIs and Databases via an Internet connection.
- Easy to open local files in their respective native applications e.g. a JPG or PDF in Preview.
- Easy to read, edit, save and delete local files. It is possible to use a localized JSON file as a mini-database for CRUD. Use cases will vary, exercise with caution.
- Application can be represented as an icon in the "Tray" menu with settings you can adjust.
- Application can hide its source code in the exportable file.

### Limitations
- Bulky export file eats a ton of CPU at run-time. Need to look into optimizations.
- Outdated practices for using Electron are scattered across the internet that expose Node internals to the Front End. Use the structure outlined in the following projects for best practices.

### Deployment
- Forge CLI will determine which OS you are using and build a distributable based on that exact OS.
