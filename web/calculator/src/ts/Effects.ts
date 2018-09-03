class Effect {
    static reveal(element: HTMLElement, gradientBackground: string): void {
        element.style.backgroundImage = gradientBackground;
    }

    static updateGradient(leftPositionX: number, topPositionY: number): string {
        // let gradient = `radial-gradient(circle 50px at ${leftPositionX}px ${topPositionY}px, rgba(255,255,255,0.3), rgba(255,255,255,0)), radial-gradient(circle ${70}px at ${leftPositionX}px ${topPositionY}px, rgba(255,255,255,0), rgba(255,255,255,0.3), rgba(255,255,255,0), rgba(255,255,255,0))`;
        let gradient = `radial-gradient(circle 50px at ${leftPositionX}px ${topPositionY}px, rgba(255,255,255,0.3), rgba(255,255,255,0))`;
        return gradient;
    }

}

export default Effect;