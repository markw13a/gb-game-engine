describe('<Dialog />', () => {
    it('should show text', () => {
        
    })

    it('should truncate text', () => {
        // text exceeds maximum characters
        // split at maximum characters limit
        // should avoid breaking words? probably, would be nicer
        // Check first section visible
        // Press interaction key
        // Check second section visible
    })

    it('should call onDialogEnded', () => {
        // text fits within section
        // mock onDialogEnded
        // press interaction key
        // confirm onDialogEnded was called
    })

    it('should show choice menu', () => {
        // text fits
        // isMultiChoice
        // Cofirm yes/no options visible
    })

    it('should show choice menu once all text has been shown', () => {
        // text does not fit
        // isMultiChoice
        // check first text section shown
        // check yes/no not shown
        // press interaction key
        // check yes/no shown
    })

    it('should make choice', () => {
        // text fits
        // isMultiChoice
        // Check yes/no options visible
        // press interaction key
        // check onChoice called with "yes"
        // press "down" key (forgot we'd need one!)
        // press interaction key
        // check onChoice called with "no"
    })
})