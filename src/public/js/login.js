function validationPhone(phone) {
    const startsWithZero = phone.startsWith('0')
    const isTenDigits = phone.length === 10
    return {
        startsWithZero,
        isTenDigits,
    }
}
function validationPassword(password) {
    const moreThanSevenCharacters = password.length > 7
    return {
        moreThanSevenCharacters,
    }
}
// show notification of login status
function showNotification(message) {
    const notification = document.getElementById('notification')
    notification.innerText = message
    notification.style.display = 'block'
    setTimeout(() => {
        notification.style.display = 'none'
    }, 3000)
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const phone = document.getElementById('phone-number').value
        const password = document.getElementById('password').value

        const phoneError = document.getElementById('phone-err')
        const passwordError = document.getElementById('password-err')

        phoneError.style.display = 'none'
        passwordError.style.display = 'none'

        let valid = true

        // check phone validation
        const validPhone = validationPhone(phone)
        if (!validPhone.startsWithZero) {
            phoneError.innerText = 'Số điện thoại phải bắt đầu từ 0.'
            phoneError.style.display = 'block'
            valid = false
        } else if (!validPhone.isTenDigits) {
            phoneError.innerText = 'Số điện thoại phải có 10 chữ số.'
            phoneError.style.display = 'block'
            valid = false
        }
        // check password validation
        if (!validationPassword(password).moreThanSevenCharacters) {
            passwordError.innerText = 'Mật khẩu phải có ít nhất 8 ký tự.'
            passwordError.style.display = 'block'
            valid = false
        }
        if (valid) {
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone, password }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        window.location.href = data.redirectTo
                    } else {
                        showNotification(data.message)
                    }
                })
        }
    })
})
const inputs = document.querySelectorAll('input')
inputs.forEach((input) => {
    input.addEventListener('focus', () => {
        const errorId = `${input.name}-err`
        const errorElement = document.getElementById(errorId)
        if (errorElement) {
            errorElement.style.display = 'none'
        }
    })
})
