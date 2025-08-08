{
  # Kids Game Engine with Three.js and Vite
  # This Nix flake sets up everything you need for development!
  # To start developing, run: nix develop
  # To build your project, run: nix build .

  description = "Kids Game Engine with Three.js and Vite";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in {
        # This is your development shell!
        devShell = pkgs.mkShell {
          buildInputs = [
            pkgs.nodejs # Node.js for running JavaScript and TypeScript
            pkgs.nodePackages.npm # npm for installing packages (includes npx)
          ];
          shellHook = ''
            echo "Welcome to the Kids Game Engine devShell!"
            echo "Use npm and npx for development. Build with: nix build ."
          '';
        };
        # This is your build output!
        packages.default = pkgs.stdenv.mkDerivation {
          name = "kids-game-engine";
          src = ./.;
          buildInputs = [ pkgs.nodejs pkgs.nodePackages.npm ];
          buildPhase = ''
            npm install
            npm run build
          '';
          installPhase = ''
            mkdir -p $out
            cp -r dist/* $out/
          '';
        };
      });
}
