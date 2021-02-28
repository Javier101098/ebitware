const controller = {};

controller.list = (req, res) => {

  let id = req.params.id ;
  !id ? sql = 'SELECT * FROM cliente' 
  :sql = 'SELECT * FROM cliente where  Cliente_ID = ' + id

  req.getConnection((err, conn) => {

    conn.query(sql, (err, clientes) => {
     if (err) {

      return res.status(500)
      .send({ 
        Cve_Error : -1,
        Cve_Mensaje:'Hubo un problema en el servidor'
      });

     }
     return res.status(200)
     .send({ 
        Cve_Error : 0,
        Cve_Mensaje : {clientes},
      });

    });


  });
};

controller.new = (req, res) => {
  const data = req.body;
  req.getConnection((err,connection)=>{
    sql = "SELECT * FROM cliente where Correo_Electronico = '"+ data.Correo_Electronico+"' or Nombre_Usuario = '"+data.Nombre_Usuario+"'";
    connection.query(sql,(err,cliente)=>{
      if (err) {
          return res.status(500).send({ 
          Cve_Error : -1,
          Cve_Mensaje:'Hubo un problema en el servidor',
        })
      } else if (cliente.length > 0) {
        return res.status(500).send({ 
          Cve_Error : -1,
          Cve_Mensaje: 'El nombre de usuario o correo electronico ya se encuentra registrado'
        })
      }
      req.getConnection((err, create) => {
        create.query('INSERT INTO cliente set ?', data, (err, cliente) => {
          if (err) {
              return res.status(500).send({ 
              Cve_Error : -1,
              Cve_Mensaje:'Hubo un problema en el servidor',
            })
          }else{
            return res.status(500).send({ 
              Cve_Error : 0,
              Cve_Mensaje: 'El cliente se ha registrado de manera correcta',
            })
          }
        })
      })

    })
  });
};

controller.update = (req, res) => {

  const { id } = req.params;
  const newCustomer = req.body;
  req.getConnection((err,connection)=>{
    sql = "SELECT * FROM cliente where  Cliente_ID = " + id;
    connection.query(sql,(err,cliente)=>{
      if (err) {
          return res.status(500).send({ 
          Cve_Error : -1,
          Cve_Mensaje:'Hubo un problema en el servidor',
        })
      } else if (cliente.length == 0) {
        return res.status(500).send({ 
          Cve_Error : -1,
          Cve_Mensaje: 'El cliente no se encuntra registrado'
        })
      }
      req.getConnection((err, conn) => {
        conn.query('UPDATE cliente set ? where Cliente_ID = ?', [newCustomer, id], (err, rows) => {
          if (err) {
            return res.status(500).send({ 
              Cve_Error : -1,
              Cve_Mensaje:'Hubo un problema en el servidor',
            })
          }
          return res.status(200).send({
            mesCve_Error : 0,
            Cve_Mensaje:'Se han modificado los datos del cliente',
          })

        });
    
      });

    })
  });

};


module.exports = controller;
