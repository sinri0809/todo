function delay(ms){
  return new Promise(res => setTimeout(res, ms))
}

async function get1(){
  await delay(1500);
  console.log("function 1")
  return 2;
}

async function get2(){
  await delay(3000);
  console.log("function 2")
  return 3;
}

const finall = async () => {
  await get1();
  await get1();
  await get1();
  await get1();
  // get2();s
  return 0;
}

// finall().then(console.log);
// finall();


function waitPlease(){
  return new Promise(res => setTimeout(res, 1500))
  
}
async function getA(){
  await waitPlease()
  console.log('get')
  return 1;
}

const result2 = async () => {
  console.log('call1')
  await getA();
  console.log('call2')
  await getA();
  await getA();
  await getA();
  return 0;
}
result2().then(console.log);