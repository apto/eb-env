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
var ebEnv = require('eb-env');

var envName = ebEnv.name;
```

By default, the environment info is loaded from the temp file mentioned above
and copied into a file in the module directory (in case the temp file goes
away). Alternatively, you can load from a different file:

```js
var ebEnv = require('eb-env');

ebEnv.load('/my/eb-env.json');

var envName = ebEnv.name;
```

## Available environment info

### name

The full name of your elastic beanstalk environment.

### app.sourceUrl

The URL where the source of your app was retrieved.

### app.sourceId

The commit ID of the deployed version of your app.