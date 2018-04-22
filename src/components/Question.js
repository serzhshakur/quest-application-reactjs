import React from 'react'
import ModalImage from './ModalImage.js'
import Image from './Image.js'
import { fetchQuestion } from '../api/api.js'

class Question extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false,
            imgSrc: ''
        }
    }

    openModal(imgSrc) {
        this.setState({ imgSrc, isModalOpen: true });
    }

    closeModal() {
        this.setState({
            isModalOpen: false,
            imgSrc: ''
        });
    }

    render() {
        const { isModalOpen, imgSrc } = this.state;
        const { text: question, images } = this.props.question;
        return (
            <div>
                <div
                    id='question'
                    dangerouslySetInnerHTML={{ __html: question }}
                />

                {images &&
                    (<div>
                        <div className='images-container'>
                            {images.map((image, index) => (
                                <Image
                                    key={index}
                                    image={image}
                                    openModal={() => this.openModal(image)} />)
                            )}
                        </div>
                        <ModalImage
                            show={isModalOpen}
                            onClose={this.closeModal.bind(this)}
                            src={imgSrc}>
                        </ModalImage>
                    </div>)
                }

            </div>
        )
    }
}

export default Question;