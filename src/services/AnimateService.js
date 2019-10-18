class AnimateService {
    animate(element, animationName, animationDuration, callback) {

        const node = document.getElementById(element)
        animationDuration = animationDuration || "delay-0s";
        node.classList.add('animated', animationName, animationDuration)

        function handleAnimationEnd() {
            node.classList.remove('animated', animationName)
            node.removeEventListener('animationend', handleAnimationEnd)

            if (typeof callback === 'function') callback()
        }

        node.addEventListener('animationend', handleAnimationEnd)

    }
}

const animateService = new AnimateService();

export default animateService;