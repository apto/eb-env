eb-env
======

Add config files to your elastic beanstalk project to seed environment information. Use module to get environment info in your app.

## Installation

### To get command line tool:

npm install eb-env -g

### To add to your project:

npm install eb-env

## Usage

### Initialize project

From project root:

```bash
eb-env init
```

The above command will add a config file to your .ebextensions directory. The
config file will add environment information to a temp file so the eb-env module
can consume it.

### Use module

```js
var eb = require('eb-env');

var envName = eb.env.name;
```

## Available environment info

### env.name

The full name of your elastic beanstalk environment.

### env.autoScalingGroup

The auto-scaling group to which this instance belongs.

### app.source

The URL where the source of your app was retrieved.

### app.commit

The commit ID of the deployed version of your app.