'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    _ = require('underscore.string'),
    scriptBase = require('../script-base'),
    exec = require('child_process').exec;

var DockerGenerator = module.exports = function DockerGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  console.log('Let\'s try to make some Docker ' + this.name + ' for the fun of it !');
  this.baseName = this.config.get('baseName');
  this.packageName = this.config.get('packageName');
  this.packageFolder = this.config.get('packageFolder');
  this.databaseType = this.config.get('databaseType'); // sql / mongo / cassandra
  this.devDatabaseType = this.config.get('devDatabaseType'); // sql : h2Memory, mysql, postgresql, oracle ; mongo : mongo ; cassandra : cassandra
  this.prodDatabaseType = this.config.get('prodDatabaseType'); // sql : h2Memory, mysql, postgresql, oracle ; mongo : mongo ; cassandra : cassandra

  console.log(this.baseName)
    console.log("this.databaseType "+this.databaseType)
    console.log("this.devdatabaseType "+this.devDatabaseType)
    console.log("this.proddatabaseType "+this.prodDatabaseType)

};

util.inherits(DockerGenerator, yeoman.generators.Base);
util.inherits(DockerGenerator, scriptBase);

DockerGenerator.prototype.askFor = function askFor() {
  var cb = this.async();
  var questions = 2
    var prompts = [
    {
      type: 'confirm',
      name: 'isUserOK',
      message: '(0/'+ questions +') Bonjour ! Allez vous bien?',
      default: true
    },
    {
      type: 'list',
      name: 'dockerProfile',
      message: '(1/' + questions + ') Which profile would you like to use for running jhipster?',
      choices: [
      {
        value: 'dev',
        name: 'dev'
      },
      {
        value: 'prod',
        name: 'prod'
      }
      ],
      default: 0
    },
    {
      type: 'input',
      name: 'dockerDataPath',
      validate: function (input) {
        if (input && input != " " && input.indexOf(':') == -1) return true;
        return 'path can\'t contain semicolomns';
      },
      message: '(2/' + questions + ') Specify a path for storing data from dockerized services?',
      default: '.'
    },

    ]
    console.log(chalk.green('This will generate a docker-compose environment suited for your project!'));
    console.log(chalk.green('docker container will bind on localhost and local jhipster app will be able to use the services'));
    this.prompt(prompts, function (props) {
      this.isUserOK = props.isUserOK;
      this.dockerProfile = props.dockerProfile;
      cb();
    }.bind(this));
};

DockerGenerator.prototype.checkInstallation = function checkInstallation() {
  return;
  if(this.abort) return;
  var done = this.async();

  // need to test if sudo is required to run docker command
  exec('docker --version', function (err) {
    if (err) {
      this.log.error('You don\'t have docker installed. ' +
          'Install it from https://www.docker.com/');
      this.abort = true;
    }else{
      console.log("docker installation : OK")
    }
    done();
  }.bind(this));
};

DockerGenerator.prototype.files = function files() {
  if(this.abort) return;
  var done = this.async();

  console.log('generator', 'service');
  console.log(process.env['USER']);
  console.log('isUSerOK', this.isUserOK);
  console.log('dockerProfile', this.dockerProfile);

  done();

};
