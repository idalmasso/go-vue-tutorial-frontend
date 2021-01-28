module.exports = {
  publicPath: "./",

  pwa: {
    name: "GoVueChat! Chat powered by vue and GO!",
    themeColor: "#deb887",
    msTileColor: "#deb887",
    appleMobileWebAppCache: "yes",
    manifestOptions: {
      short_name: "GoVueChat",
      background_color: "#deb887"
    },
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      runtimeCaching: [
        {
          // Match any same-origin request that contains 'api/posts (so also api/posts/id/comments'.
          urlPattern: /api\/posts/,
          method: "POST",
          handler: "networkOnly",
          options: {
            backgroundSync: {
              name: "my-queue-name",
              options: {
                maxRetentionTime: 60 * 60 * 24
              }
            }
          }
        },
        {
          // Match any same-origin request that contains 'api/posts'.
          urlPattern: /api\/posts/,
          method: "DELETE",
          handler: "networkOnly",
          options: {
            backgroundSync: {
              name: "my-queue-name",
              options: {
                maxRetentionTime: 60 * 60 * 24
              }
            }
          }
        },
        {
          // Match any same-origin request that contains 'api/posts'.
          urlPattern: /api\/posts/,
          method: "PATCH",
          handler: "networkOnly",
          options: {
            backgroundSync: {
              name: "my-queue-name",
              options: {
                maxRetentionTime: 60 * 60 * 24
              }
            }
          }
        }
      ]
    }
  }
};
