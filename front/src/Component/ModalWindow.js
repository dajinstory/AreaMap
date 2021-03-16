import {useState,useEffect} from 'react'
import Modal from 'react-modal';
import bikelogo from '../image/logo2.png'

function ModalWindow({adress,isOpen}){

  var subtitle;
  const [modalIsOpen,setIsOpen] = useState(isOpen);

  useEffect(() => {
    setIsOpen(isOpen)
  }, [isOpen])
  
  useEffect(() => {
    console.log(bikelogo)
  }, [])

  function closeModal(){
    setIsOpen(false);
  }

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      borderRadius: '20px',
      boxShadow: "3px 3px 3px 3px gray"
    }
  };
  
  Modal.setAppElement(document.getElementById('root'))

  return (
    <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div style={{width:"400px"}}>
              
              <div style={{display:"flex", "justifyContent": "space-between"}}>
                  <div style={{marginLeft:"20px","textAlign":"left","font":"normal normal normal 50px/57px Nanum Brush Script"}}> 축하합니다!</div>
                  <div onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 40 40">
                      <path id="Icon_ionic-md-close" data-name="Icon ionic-md-close" d="M47.523,11.523l-4-4-16,16-16-16-4,4,16,16-16,16,4,4,16-16,16,16,4-4-16-16Z" transform="translate(-7.523 -7.523)" fill="#7e7e7e"/>
                    </svg>
                  </div>
              </div>

              <div style={{marginTop:"20px", display:"flex", justifyContent:"center"}}>
                <div style={{font:"bold normal normal 20px Spoqa Han Sans, Sans-serif"}} >"{adress}"은</div>
              </div>
              <div style={{marginTop:"20px", display:"flex",justifyContent:"space-between"}}>
                <img style={{marginLeft:"20px",marginTop:"15px", width:"150px",height:"40px"}} src={bikelogo}  alt="BigCo Inc. logo" />
                <div>
                  <span style={{textDecoration:"underline" ,"textAlign":"left","font":"bold normal normal 50px/57px Nanum Brush Script"}} > 따세권</span>
                  <span style={{"textAlign":"left","font":"normal normal normal 50px/57px Nanum Brush Script"}} > 입니다.</span>
                </div>
              </div>
          </div>
        </Modal>
  )
}

export default ModalWindow;