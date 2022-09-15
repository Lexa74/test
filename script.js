window.addEventListener('DOMContentLoaded', (event) => {
    const btnOpenModal = document.querySelectorAll('.open-modal')
    const [modalWindow, succssefullModal] = document.querySelectorAll('.modal-window')
    const elemCloseModal = document.querySelectorAll('.close-modal')
    const [btnSendData] = document.querySelectorAll('.send-data')

    const openSuccssefullModal = () => {
        succssefullModal.classList.add('active')
        document.body.classList.add('active')
    }

    const closeSuccssefullModal = () => {
        succssefullModal.classList.remove('active')
        document.body.classList.remove('active')
    }

    const openModal = () => {
        modalWindow.classList.add('active')
        document.body.classList.add('active')
    }

    const closeModal = () => {
        modalWindow.classList.remove('active')
        document.body.classList.remove('active')
    }

    const validation = (name, email, message) => {
        const validateNotEmpty = (dataItem) => {
            return dataItem !== ''
        }
        const validateEmail = (email) => {
            return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        }

        const elements = [name, email, message]
        const inValidElements = []

        for(let i = 0; i < elements.length; i++) {
            if(i == 1 && !validateEmail(elements[i].value)) {
                inValidElements.push(elements[i])
                continue
            }
            if(!validateNotEmpty(elements[i].value)) inValidElements.push(elements[i])
        }

        return {
            resultValid: [name.value, email.value, message.value].every(validateNotEmpty) && validateEmail(email.value),
            notValid: inValidElements
        }
    }

    const sendData = (event) => {
        event.preventDefault();
        const [name] = document.querySelectorAll('.input-send-name')
        const [email] = document.querySelectorAll('.input-send-email')
        const [textArea] = document.querySelectorAll('.input-send-textarea')

        const validator = validation(name, email, textArea)
        const allInputs = [name, email, textArea]

        allInputs.map((elem) => {
            elem.classList.remove('error')
        })

        if(!validator.resultValid) {
            validator.notValid.map((elem) => {
                elem.classList.add('error')
            })
        } else {
            fetch('https://httpbin.org/post', {
                method: 'POST'
            }).then(() => {
                closeModal();
                openSuccssefullModal();
            });
        }
    }

    btnSendData.addEventListener('click', sendData)

    btnOpenModal.forEach((elem) => {
        elem.addEventListener('click', openModal)
    })

    elemCloseModal.forEach((elem) => {
        elem.addEventListener('click', () => {
            closeModal()
            closeSuccssefullModal()
        })
    })

});

