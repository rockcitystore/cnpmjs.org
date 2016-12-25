module.exports = {
    debug: false,
    enableCluster: true, // enable cluster mode
    mysqlServers: [
      {
        host: 'localhost',
        port: 3306,
        user: 'cnpm',
        password: '2Sxo*eXeAI^C5EOrDQSpSQ70*eqOMJ$2',
      }
    ],
    mysqlDatabase: 'cnpmDB',
    enablePrivate: false, // enable private mode, only admin can publish, other use just can sync package from source npm
    admins: {
      admin: 'a16120119@10.24.47.136',
    },
    syncModel: 'exist'// 'none', 'all', 'exist'
    }; 