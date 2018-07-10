const cron = require('node-cron');
const axios = require('axios');
const pool = require('./pool');

cron.schedule('*/10 * * * *', function(){
    console.log('running a task every minute');
    pingPhoton();
});

function pingPhoton() {
    axios.get('https://api.particle.io/v1/devices/310036000347363339343638/result?access_token=68750b88afdf6f97d774c41ab4c2d4dbe9444036')
        .then((response) => {
            console.log(response.data.result);
            let str = response.data.result;
            temp = str.substr(15, 4);
            device_id = 1;
            let date = response.data.coreInfo.last_heard;
            let queryText = `INSERT INTO "sensor_data" (device_id, date, temperature)
            VALUES( $1, $2, $3)`;
            pool.query(queryText, [
                device_id,
                date,
                temp
            ])
        })
}