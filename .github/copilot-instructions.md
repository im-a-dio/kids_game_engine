<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Workspace Instructions

- This project is for a young developer using NixOS. Please provide clear, beginner-friendly explanations and code comments.
- Use Nix flakes for environment setup and package management (see flake.nix).
- Use the devShell for development commands (npm, npx).
- Build the project using `nix build .`.
- **Important:** Nix flake commands (`nix develop`, `nix build .`) can only see staged or committed changes. Always run `git add` before building or developing.
- **Always use a feature branch for your work. Always run `git add` and `git commit` your changes before building or developing.**
- All code should be suitable for children aged 6+.
- Mechanics should be modular, easy to understand, and visually engaging.
- TLA+ specifications for each mechanic should be included in docs/tla/ and explained simply.
- Use Three.js for interactive graphics and Vite for SPA scaffolding.
- Prioritize accessibility, clarity, and fun in all UI and code.
