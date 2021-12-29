const path = require("path");

module.exports = {
    webpack: {
        alias: {
            "Components": path.resolve(__dirname, "src/components/"),
            "Contexts": path.resolve(__dirname, "src/contexts/"),
            "Providers": path.resolve(__dirname, "src/providers/"),
            "Pages": path.resolve(__dirname, "src/pages/"),
            "Public": path.resolve(__dirname, "src/public/"),
            "Root": path.resolve(__dirname, "src/")
        }
    },
    jest: {
        configure: {
            moduleNameMapper: {
                "^Components(.*)$": "<rootDir>/src/components$1",
                "^Contexts(.*)$": "<rootDir>/src/contexts$1",
                "^Providers(.*)$": "<rootDir>/src/providers$1",
                "^Pages(.*)$": "<rootDir>/src/pages$1",
                "^Public(.*)$": "<rootDir>/public$1",
                "^Root(.*)$": "<rootDir>/src$1"
            }
        }
    }
};