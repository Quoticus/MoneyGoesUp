window.onload = function(){
  let gameObject = {
    currentMoney:0,
    upgradeRate:10,
    upgradeCostMultiplier:7,
    curPerTick:0,
    upgradeCost:0,
    updateTick:250,
    gameLoopRef:null
  };
  document.getElementById("genText").innerHTML = gameObject.upgradeRate;
  document.getElementById("moneyUp").addEventListener("click", function(){
    gameObject.currentMoney -= gameObject.upgradeCost;
    addGeneration(gameObject);
    if(!gameObject.gameLoopRef){
      gameStart(gameObject);
    }
  });
}

function addGeneration(gameObject){
  gameObject.curPerTick += gameObject.upgradeRate;
  gameObject.upgradeCost = (gameObject.curPerTick)*gameObject.upgradeCostMultiplier;
  document.getElementById("genText").innerHTML = gameObject.curPerTick + gameObject.upgradeRate;
  document.getElementById("costText").innerHTML = gameObject.upgradeCost;
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
