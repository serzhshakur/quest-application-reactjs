import React from 'react'
import ModalImage from './ModalImage.js'
import Image from './Image.js'
import { fetchQuestion } from '../api/api.js'

class Question extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            question: '',
            images: [],
            isModalOpen: false,
            imgSrc: ''
        }
    }

    componentWillMount() {
        this.updateQuestion()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentQuestion > this.props.currentQuestion) {
            this.updateQuestion()
        }
    }

    updateQuestion() {
        fetchQuestion()
            .then(response => this.setState({
                question: response.question,
                images: response.images
            }))
    }

    openModal(imgSrc) {
        this.setState({ imgSrc, isModalOpen: true });
    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }

    render() {
        const { images, isModalOpen, imgSrc } = this.state;
        return (
            <div>
                <div id='question'>{this.state.question}</div>

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