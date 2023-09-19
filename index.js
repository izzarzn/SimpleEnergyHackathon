const express = require('express');
const app = express();
const port = 3000;

const vehicleManagementRoute = require('./VehicleManagementRoute.js');
const dealerManagementRoute = require('./DealerManagementRoute.js');
const salesInventoryRoute = require('./SalesInventoryRoute.js');

app.use('/vehicle-management', vehicleManagementRoute);
app.use('/dealer-management', dealerManagementRoute);
app.use('/sales-inventory', salesInventoryRoute);

app.listen(port, () => {
  console.log(`App Listening on Port:${port}`);
});

/*const express = require('express')
const app = express()
const port = 3000
const db = require('./Database.js');
 
app.get('/VehicleManagement', (req, res) => {
  res.status(200).json({
    message:"Vehicle Management Route"
  })
})

app.get('/DealerManagement',(req,res)=>{
    res.json({
        message:"Dealer Management Route"
    })
})


app.get('/Sales&Inventory',(req,res)=>{
    res.json({
        message:"Sales and Inventory Route"
    })
})

app.listen(port, () => {
  console.log(`App Listening on Port:${port}`)
})
*/