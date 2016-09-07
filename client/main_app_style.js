const K_WIDTH = 1000;
const K_HEIGHT = 900;

const mainAppStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: 0,
  top: 0,

  //border: '5px solid #f44336',
  //borderRadius: K_HEIGHT,
  backgroundColor: 'black',
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4
};

export {mainAppStyle};