# Description

The sample application is designed to work in a project that has
the sample vibration sensor model pre-configured. The application
expects the following metrics to be available:

* `az` - the input accelerometer readings
* `state` - the result of the model classification
* `confidence` - the confidence of the model algorithm

The metrics should be available for the geo notation `中国|广西|桂林市|秀峰区|941b259e`, the
metrics resolution is `1s` or better.

# Running the application locally

* Register with the system devaccess UI
* Run `twapp run --scope {scope} --project {project}`, e.g.:
  
  ```
  $ twapp run --scope iic --project tempsensor
  ```

* Navigate in the browser to http://localhost:8080