const axios = require('axios');
const querystring = require('querystring');
const MockAdapter = require('axios-mock-adapter');

const {
    CheezeWizardsAPI,
    ALCHEMY_API_URL,
    DUELS_BASE_PATH,
    WIZARDS_BASE_PATH
} = require('./cheeze-wizards.js');

const cheezeWizardsAPI = new CheezeWizardsAPI(
    'test@email.com',
    'test-api-token'
);

const mock = new MockAdapter(axios);

const testRequest = (request, expectedData, done) => {
    request
        .then(response => {
            expect(response.data).toEqual(expectedData);
            expect(response.status).toEqual(200);
            done();
        })
        .catch(error => {
            console.log('error', error);
            done.fail(error);
        });
};

const mockGetDuel = (expectedData, duelId) => {
    let requestUrl = ALCHEMY_API_URL + DUELS_BASE_PATH;

    if (duelId) {
        requestUrl = requestUrl + duelId;
    }

    mock.onGet(requestUrl).reply(200, expectedData);
};

const mockGetDuels = (expectedData, params) => {
    let requestUrl = ALCHEMY_API_URL + DUELS_BASE_PATH;

    if (params) {
        requestUrl = requestUrl + '?' + querystring.stringify(params);
    }

    mock.onGet(requestUrl).reply(200, expectedData);
};

const mockGetWizard = (expectedData, wizardId) => {
    let requestUrl = ALCHEMY_API_URL + WIZARDS_BASE_PATH;

    if (wizardId) {
        requestUrl = requestUrl + wizardId;
    }

    mock.onGet(requestUrl).reply(200, expectedData);
};

const mockGetWizards = (expectedData, params) => {
    let requestUrl = ALCHEMY_API_URL + WIZARDS_BASE_PATH;

    if (params) {
        requestUrl = requestUrl + '?' + querystring.stringify(params);
    }

    mock.onGet(requestUrl).reply(200, expectedData);
};

const allDuelsData = {
    duels: [
        {
            duelId: '1',
            wiz1Id: '3',
            wiz2Id: '4',
            startBlock: 8262503,
            endBlock: 8262507,
            isAscensionBattle: 'true',
            moveSet1: '1,3,2',
            moveSet2: '1,2,3',
            power1: 320000000000000,
            power2: 620000000000000,
            timedOut: true
        },
        {
            duelId: '2',
            wiz1Id: '3',
            wiz2Id: '4',
            startBlock: 8262503,
            endBlock: 8262507,
            isAscensionBattle: 'true',
            moveSet1: '1,3,2',
            moveSet2: '1,2,3',
            power1: 320000000000000,
            power2: 620000000000000,
            timedOut: false
        }
    ]
};

const allWizardsData = [
    {
        id: '1243',
        owner: '0x6f35B0Cfc58Eb1e21eeF8a439BbB0cE4C929d32a',
        affinity: 3,
        power: '70547777578800',
        createdBlockHash:
            '0x162a7681950109e161da8316255c711fe2814534b6ed55f1415dfd4e14be2ecf',
        createdBlockNumber: 7780416
    },
    {
        id: '1236',
        owner: '0x6dFde5E6EA1f0504475aD04EEe6e341fc3b16eC5',
        affinity: 2,
        power: '70000000000000',
        createdBlockHash:
            '0x731a6e2cf6a46486ce34c3547e2986e78961cba00d0a8ef3659c82c959e0aeed',
        createdBlockNumber: 7780381
    }
];

describe('Cheeze Wizards API', () => {
    it('should get duel by id', done => {
        const data = {
            duelId: '1',
            wiz1Id: '3',
            wiz2Id: '4',
            startBlock: '8262503',
            endBlock: '8262507',
            isAscensionBattle: 'true',
            moveSet1: '1,3,2',
            moveSet2: '1,2,3',
            power1: '320000000000000',
            power2: '620000000000000',
            timedOut: 'false'
        };

        mockGetDuel(data, 1);
        testRequest(cheezeWizardsAPI.duel(1), data, done);
    });

    it('should get all duels if id is not provided', done => {
        mockGetDuel(allDuelsData);
        testRequest(cheezeWizardsAPI.duel(), allDuelsData, done);
    });

    it('should get duels by block, wizard, status', done => {
        const params = {
            startsAfter: 8262502,
            wizardIds: [3, 4]
        };

        mockGetDuels(allDuelsData, params);
        testRequest(cheezeWizardsAPI.duels(params), allDuelsData, done);
    });

    it('should get all duels if no params are provided', done => {
        mockGetDuels(allDuelsData);
        testRequest(cheezeWizardsAPI.duels(), allDuelsData, done);
    });

    it('should get wizard by id', done => {
        const data = {
            id: '1',
            owner: '0xF0128825b0c518858971d8521498769148137936',
            affinity: 1,
            power: '777000000000000'
        };

        mockGetWizard(data, 1);
        testRequest(cheezeWizardsAPI.wizard(1), data, done);
    });

    it('should get all wizards if id is not provided', done => {
        mockGetWizard(allWizardsData);
        testRequest(cheezeWizardsAPI.wizard(), allWizardsData, done);
    });

    it('should get wizards by affinity, power, owner', done => {
        const data = {
            wizards: [
                {
                    id: '6',
                    owner: '0xF0128825b0c518858971d8521498769148137936',
                    affinity: 4,
                    power: '420000000000000',
                    createdBlockHash:
                        '0xce0ad9d6f8ebd54c6ecc75b88961ac81dbe159db01ee95b744b969d427832b25',
                    createdBlockNumber: 7914701
                },
                {
                    id: '15',
                    owner: '0xF0128825b0c518858971d8521498769148137936',
                    affinity: 4,
                    power: '420000000000000',
                    createdBlockHash:
                        '0xce0ad9d6f8ebd54c6ecc75b88961ac81dbe159db01ee95b744b969d427832b25',
                    createdBlockNumber: 7914701
                }
            ]
        };

        const params = {
            affinity: 4,
            owner: '0xF0128825b0c518858971d8521498769148137936',
            minPower: 100000,
            maxPower: 900000000000000
        };

        mockGetWizards(data, params);
        testRequest(cheezeWizardsAPI.wizards(params), data, done);
    });

    it('should get all wizards if params are not provided', done => {
        mockGetWizards(allWizardsData);
        testRequest(cheezeWizardsAPI.wizards(), allWizardsData, done);
    });
});
