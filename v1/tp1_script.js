const http = require('http');

const hostname = '0.0.0.0';
const port = process.env.NODE_PORT || 3000;
const env = process.env;
const dbus = require('dbus-next')
const bus = dbus.systemBus()

const getAvailableDevices = async () => {
  let obj = await bus.getProxyObject('org.freedesktop.ColorManager', '/org/freedesktop/ColorManager');
  let colorMngr = obj.getInterface('org.freedesktop.ColorManager')
  console.log(await colorMngr.GetDevices())
};

const getDeviceInfo = async (deviceId) => {

};

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  for (var k in env) {
    res.write(k + ": " + env[k] + "\n");
  }
  res.end();
});

server.listen(port, hostname, () => {
  console.log("Server running at http://" + hostname + ":" + port + "/");
});

server.get('/screens', (req, res) => {
  res.json(getAvailableDevices());
});

server.get('/screens/:screenId', (req, res) => {
  res.json(getDeviceInfo(req?.query?.screenId));
});