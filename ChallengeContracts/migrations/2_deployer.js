var Deployer = artifacts.require("./Deployer.sol");
var Challenge1 = artifacts.require("./UpdateableOwnable.sol");
var Challenge2 = artifacts.require("./UpdateableOwnable.sol");
var Challenge3 = artifacts.require("./UpdateableOwnable.sol");
var Challenge4 = artifacts.require("./UpdateableOwnable.sol");
var Challenge5 = artifacts.require("./UpdateableOwnable.sol");

module.exports = function(deployer) {
  deployer.deploy(Challenge1).then(() => {
    return deployer.deploy(Challenge2).then(() => {
      return deployer.deploy(Challenge3).then(() => {
        return deployer.deploy(Challenge4).then(() => {
          return deployer.deploy(Challenge5).then(() => {
            return deployer.deploy(Deployer, Challenge1.address, Challenge2.address, Challenge3.address, Challenge4.address, Challenge5.address);
          });
        });
      });
    });
  });
};
