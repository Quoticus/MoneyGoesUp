window.onload = function(){
  let gameLoopRef;
  let gameObject = {
    currentMoney:0,
    curPerTick:0,
    upgradeCost:0,
    updateTick:250,
    gameLoopRef:gameLoopRef
  };
  document.getElementById("moneyUp").addEventListener("click", function(){
    gameObject.currentMoney -= gameObject.upgradeCost;
    addGeneration(gameObject);
    if(!gameObject.gameLoopRef){
      gameStart(gameObject);
    }
  });
}

function addGeneration(gameObject){
  gameObject.curPerTick++;
  gameObject.upgradeCost = (gameObject.curPerTick+1)*10;
  document.getElementById("genText").innerHTML = gameObject.curPerTick+1;
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
  console.log("Before: GLR-"+gameObject.gameLoopRef+" UPTI-"+gameObject.updateTick)
  gameObject.gameLoopRef = window.setInterval(function(){gameLoop(gameObject);}, gameObject.updateTick);
  console.log("After: GLR-"+gameObject.gameLoopRef+" UPTI-"+gameObject.updateTick)
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
