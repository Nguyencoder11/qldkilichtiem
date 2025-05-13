import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mastercard from '../../../assest/images/mastercard.png';
import vnapy from '../../../assest/images/vnpay.png';


library.add(fas, fab);

function Footer() {
    return (

        <footer className="footer"
            style={{
                background: '#616161',
                padding: '30px 0',
                fontSize: '14px',
                color: '#ffffff',
                borderTop: '1px solid #ddd',
            }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Tên Công Ty</h5>
                        <p>Công Ty Vaxms HaUI</p>
                        <p><strong>Địa chỉ:</strong> Số 298 Đ. Cầu Diễn, Minh Khai, Bắc Từ Liêm, Hà Nội, Việt Nam</p>
                        <p><strong>Liên hệ:</strong> 0243.765.5121</p>
                        <p><strong>Email:</strong> <a href="mailto:vaxms@gmail.com">vaxms@gmail.com</a></p>
                    </div>

                    <div className="col-md-4">
                        <h5>Vị trí của chúng tôi</h5>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5013.114302295123!2d105.73253187635122!3d21.05373098060188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345457e292d5bf%3A0x20ac91c94d74439a!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBIw6AgTuG7mWk!5e1!3m2!1svi!2s!4v1746548102548!5m2!1svi!2s"
                            width="100%"
                            height="300"
                            allowfullscreen=""
                            loading="lazy">

                        </iframe>
                    </div>

                    <div className="col-md-4">
                        <h5>Liên hệ</h5>
                        <ul className="list-unstyled">
                            <li style={{ marginBottom: '10px' }}>
                                <a href="https://www.facebook.com/YourPageName" target="_blank">
                                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/900px-2023_Facebook_icon.svg.png' width='24px' height='24px' style={{ marginRight: '8px' }}></img>
                                    Facebook
                                </a>
                            </li>
                            <li style={{ marginBottom: '10px' }}>
                                <a href="https://zalo.me/0243.765.5121" target="_blank">
                                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/75px-Icon_of_Zalo.svg.png' width='24px' height='24px' style={{ marginRight: '8px' }}></img>
                                    Zalo
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <p>&copy; 2024 Công Ty TNHH ABC. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
