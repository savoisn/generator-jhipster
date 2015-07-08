'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    _ = require('underscore.string'),
    scriptBase = require('../script-base');

var DockerGenerator = module.exports = function DockerGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);
    console.log('Let\'s try to make some Docker ' + this.name + ' for the fun of it !');
    this.baseName = this.config.get('baseName');
    this.packageName = this.config.get('packageName');
    this.packageFolder = this.config.get('packageFolder');
    this.databaseType = this.config.get('databaseType');
    console.log(this.config)
    console.log(this.config.get('databaseType'))
};

util.inherits(DockerGenerator, yeoman.generators.Base);
util.inherits(DockerGenerator, scriptBase);

DockerGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [
    {
        type: 'confirm',
        name: 'useInterface',
        message: '(1/1) Bonjour ! Allez vous bien?',
        default: false
    }
    ]
    this.prompt(prompts, function (props) {
        this.useInterface = props.useInterface;
        cb();
    }.bind(this));
};

DockerGenerator.prototype.files = function files() {

    console.log('generator', 'service');
    console.log(process.env['USER']);
    console.log('service/interface', this.useInterface);

};
