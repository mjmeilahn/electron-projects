# Electron Projects
Explores core Electron, capabilities and limitations of JS software.

1. Screen Recorder - Fetches all open software apps, the user chooses which to record. When the recording is stopped an exportable file is created where the user can choose where it is saved locally on their computer.

TODO: Look into automating distributables for all operating systems (OS)

NOTES on Abilities:
- Front End Developers are able to use HTML, CSS, Browser and Server-Side JavaScript into immediate desktop software applications.
- Can communicate with remote APIs and Databases via an Internet connection.
- Can open local files in their respective native applications e.g. a JPG or PDF in Preview.
- Can read, edit, save and delete local files. It is possible to use a localized JSON file as a mini-database for CRUD. Use cases will vary, exercise with caution.
- Can be represented as an icon in the "Tray" menu with settings you can adjust.
- Can hide its source code in the exportable file.

NOTES on Limitations:
- Bulky export file eats a ton of CPU at run-time.
- Outdated practices for using Electron are scattered across the internet that expose Node internals to the Front End. Use the structure outlined in the following projects for best practices.

NOTES on Deployment:
- Forge CLI will determine which OS you are using and build a distributable based on that exact OS.
