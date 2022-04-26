const application = require('./backend/app');
const config = require('./backend/configuration/configuration')
application
.start()
.then(()=>{
    console.log(`Application is running on port: ${config.port}`);
    console.log(`Application endpoint: http://localhost:${config.port}/`)
});