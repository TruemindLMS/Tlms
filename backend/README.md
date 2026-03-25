#This folder is dedicaated to Backend devolopers.
# TeamIndia.TalentFlow

This repository contains the `TeamIndia.TalentFlow` backend (ASP.NET Core, .NET 10). The API project is located at `Backend/TeamIndia.TalentFlow/TeamIndia.TalentFlow.API`.

## Prerequisites
- .NET 10 SDK installed (download from Microsoft).
- Git
- Optional: Visual Studio 2022/2023 or VS Code with C# extensions

## Clone and open
1. Clone the repo:
   ```bash
   git clone https://github.com/chibuogwumerit-cloud/Team-India.git
   cd Team-India/Backend/TeamIndia.TalentFlow
   ```
2. Open the solution in your IDE (there is a solution file `TeamIndia.TalentFlow.slnx` in the project folder) or work with the API project directly.

## Restore, build and run (CLI)
From the `Backend/TeamIndia.TalentFlow` folder:

1. Restore packages:
   ```bash
   dotnet restore
   ```
2. Build:
   ```bash
   dotnet build
   ```
3. Run the API project:
   ```bash
   dotnet run --project TeamIndia.TalentFlow.API
   ```

When running from the IDE using the provided launch profile, the browser will open automatically to the Swagger UI.

## Swagger (API docs)
- Swagger (Swashbuckle) is configured for Development. The UI is available at:
  - `https://localhost:7202/swagger/index.html` (default HTTPS port in `launchSettings.json`)
- If you get a 404, confirm the app is running and the port matches `launchSettings.json`. Also ensure `ASPNETCORE_ENVIRONMENT=Development`.
