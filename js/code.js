window.onload = function(){
  let gameObject = {
    currentMoney:0,
    upgradeRate:1,
    upgradeCostMultiplier:2,
    curPerTick:0,
    upgradeCost:0,
    updateTick:250,
    gameLoopRef:null
  };
  document.getElementById("genText").innerHTML = Math.floor(gameObject.upgradeRate);
  document.getElementById("moneyUp").addEventListener("click", function(){
    gameObject.currentMoney -= gameObject.upgradeCost;
    addGeneration(gameObject);
    if(!gameObject.gameLoopRef){
      gameStart(gameObject);
    }
  });
}

function addGeneration(gameObject){
  gameObject.curPerTick += Math.floor(gameObject.upgradeRate * gameObject.upgradeRate);
  gameObject.upgradeCost = Math.floor((gameObject.curPerTick * gameObject.upgradeRate) * gameObject.upgradeCostMultiplier);
  document.getElementById("genText").innerHTML = Math.floor((gameObject.upgradeRate * gameObject.upgradeRate) + gameObject.curPerTick);
  document.getElementById("costText").innerHTML = Math.floor(gameObject.upgradeCost);
  upgradeButton(gameObject);
}

function calculateMoney(gameObject){
  gameObject.currentMoney += gameObject.curPerTick;
  document.getElementById("costText").innerHTML = gameObject.upgradeCost;
  document.getElementById("money").innerHTML = gameObject.currentMoney;
  upgradeButton(gameObject);
}

function gameStart(gameObject){
  gameObject.gameLoopRef = window.setInterval(function(){gameLoop(gameObject);}, gameObject.updateTick);
}

function upgradeButton(gameObject){
  let upgradeButton = document.getElementById("moneyUp");
  if(gameObject.currentMoney < gameObject.upgradeCost){
    upgradeButton.disabled = true;
  }else{
    upgradeButton.disabled = false;
  }
}

function gameLoop(gameObject){
  calculateMoney(gameObject);
}
