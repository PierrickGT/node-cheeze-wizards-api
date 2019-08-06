const axios = require('axios');
const querystring = require('querystring');

/**
 * Cheeze Wizards Alchemy API url
 * @type {String}
 * @return {String} Returns Cheeze Wizards Alchemy API url https://cheezewizards.alchemyapi.io
 */
const ALCHEMY_API_URL = 'https://cheezewizards.alchemyapi.io';

/**
 * Wizards path
 * @type {String}
 * @return {String} Returns '/wizards/' path
 */
const WIZARDS_BASE_PATH = '/wizards/';

/**
 * Duels path
 * @type {String}
 * @return {String} Returns '/duels/' path
 */
const DUELS_BASE_PATH = '/duels/';

/**
 * Cheeze Wizards API Client
 * @return {Function}   Returns an empty function
 * @param  {String} email       Email used to get API token
 * @param  {String} apiToken    API token
 * @example
 * const cheezeWizardsAPI = new CheezeWizardsAPI('your@email.com', 'your-api-token');
 * cheezeWizardsAPI
    .wizard(1)
    .then(response => {
        console.log(response.data);
        console.log(response.status);
    })
    .catch(error => {
        console.log(error);
    });
 */
const CheezeWizardsAPI = function(email, apiToken) {
    axios.defaults.baseURL = ALCHEMY_API_URL;
    axios.defaults.headers['Content-Type'] = 'application/json';
    axios.defaults.headers['x-api-token'] = apiToken;
    axios.defaults.headers['x-email'] = email;
};

/**
 * GET method for Cheeze Wizards API
 * @constructor
 * @param  {String} url       GET request url
 * @param  {Object} params    GET request params
 * @return {Promise}          Returns a promise
 */
CheezeWizardsAPI.prototype._get = function(url, params) {
    let query = '';

    if (params) {
        query = axios.get(url + '?' + querystring.stringify(params));
    } else {
        query = axios.get(url);
    }

    return query;
};

/**
 * Method to get a duel by id
 * Fallback to get all duels if you forget id
 * @constructor
 * @param  {Integer} [duelId]    Duel Id
 * @return {Promise}             Returns a promise
 * @example
 * cheezeWizardsAPI.duel();
 * cheezeWizardsAPI.duel(1);
 */
CheezeWizardsAPI.prototype.duel = function(duelId) {
    let query = '';

    if (duelId) {
        query = this._get(DUELS_BASE_PATH + duelId);
    } else {
        query = this._get(DUELS_BASE_PATH);
    }

    return query;
};

/**
 * Method to get duels by block, wizard, status, ...
 * Fallback to get all wizards if you forget params
 * @constructor
 * @param  {Object} params                      Query parameters
 * @param  {Integer} params.startsAfter         Duels that start after this block number
 * @param  {Integer} params.startsBefore        Duels that start before this block number
 * @param  {Integer} params.endsAfter           Duels that end after this block number
 * @param  {Integer} params.endsBefore          Duels that end before this block number
 * @param  {Array} params.wizardIds             Duels involving these wizards (coma separated list of wizardIds)
 * @param  {Boolean} params.excludeInProgress   True for completed duels, false for all duels (default)
 * @param  {Boolean} params.excludeFinished     True for duels in progress, false for all duels (default)
 * @return {Promise}                            Returns a promise
 * @example
 * cheezeWizardsAPI.duels();
 * cheezeWizardsAPI.duels({
 *  startsAfter: 8262502,
 *  wizardIds: [3, 4],
 * });
 */
CheezeWizardsAPI.prototype.duels = function(params) {
    let query = '';

    if (params) {
        query = this._get(DUELS_BASE_PATH, params);
    } else {
        query = this._get(DUELS_BASE_PATH);
    }

    return query;
};

/**
 * Method to get a wizard by id
 * Fallback to get all wizards if you forget id
 * @constructor
 * @param  {Integer} [wizardId]    Wizard Id
 * @return {Promise}               Returns a promise
 * @example
 * cheezeWizardsAPI.wizard();
 * cheezeWizardsAPI.wizard(1);
 */
CheezeWizardsAPI.prototype.wizard = function(wizardId) {
    let query = '';

    if (wizardId) {
        query = this._get(WIZARDS_BASE_PATH + wizardId);
    } else {
        query = this._get(WIZARDS_BASE_PATH);
    }

    return query;
};

/**
 * Method to get wizards by affinity, power, owner, ...
 * Fallback to get all wizards if you forget params
 * @constructor
 * @param  {Object} params              Query parameters
 * @param  {String} params.owner        Wizards owned by this address
 * @param  {Integer} params.affinity    Wizards with this affinity: 0 = NOTSET, 1 = NEUTRAL, 2 = FIRE, 3 = WIND, 4 = WATER
 * @param  {Integer} params.minPower    Wizards whose power is greater than or equal to minPower
 * @param  {Integer} params.maxPower    Wizards whose power is less than or equal to maxPower
 * @return {Promise}                    Returns a promise
 * @example
 * cheezeWizardsAPI.wizards();
 * cheezeWizardsAPI.wizards({
 *  affinity: 4,
 *  owner: '0xF0128825b0c518858971d8521498769148137936',
 *  minPower: 100000,
 *  maxPower: 900000000000000,
 * });
 */
CheezeWizardsAPI.prototype.wizards = function(params) {
    let query = '';

    if (params) {
        query = this._get(WIZARDS_BASE_PATH, params);
    } else {
        query = this._get(WIZARDS_BASE_PATH);
    }

    return query;
};

module.exports = {
    CheezeWizardsAPI,
    ALCHEMY_API_URL,
    DUELS_BASE_PATH,
    WIZARDS_BASE_PATH
};
