module.exports = {
  projects: [
    ,
    '<rootDir>/libs/ottolenghi-scraper',
    '<rootDir>/apps/backend/whiskmate-graphql',
    '<rootDir>/libs/backend/whiskmate-core',
    '<rootDir>/apps/backend/whiskmate-grpc',
    '<rootDir>/libs/backend/whiskmate-grpc-client',
    '<rootDir>/libs/backend/whiskmate-grpc-core',
    '<rootDir>/apps/backend/whiskmate-grpc-cli',
    '<rootDir>/libs/backend/whiskmate-restful-core',
    '<rootDir>/apps/backend/whiskmate-restful',
  ],
  moduleNameMapper: {
    '^@whiskmate/backend/whiskmate-core/(.*)':
      '<rootDir>/libs/backend/whiskmate-core/$1',
  },
};
