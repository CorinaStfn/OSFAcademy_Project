let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

// Test suite
describe('mainpage', () => {
    // Test spec (unit test)
    it('Should show the mainpage', (done) =>{
        chai.request(app)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
        done();
        })
    });
});

// Test suite
describe('/GET womens-clothing', () => {
    // Test spec (unit test)
    it('Should GET all subcategories from women-clothing category', (done) =>{
        chai.request(app)
        .get('/womens-clothing')
        .end((err, res) => {
            res.should.have.status(200);
        done();
        })
    });
});

// Test suite
describe('/GET womens-clothing/outfits', () => {
    // Test spec (unit test)
    it('Should GET all products from outfits subcategory', (done) =>{
        chai.request(app)
        .get('/womens-clothing/outfits')
        .end((err, res) => {
            res.should.have.status(200);
        done();
        })
    });
});

// Test suite
describe('/GET womens-clothing/outfits/fall-down', () => {
    // Test spec (unit test)
    it('Should GET product by ID', (done) =>{
        chai.request(app)
        .get('/product/womens-outfits/fall-look')
        .end((err, res) => {
            res.should.have.status(200);
        done();
        })
    });
});