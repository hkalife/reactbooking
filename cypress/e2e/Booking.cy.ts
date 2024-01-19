describe('Booking - Add booking', () => {
  it('should display errors trying to input invalid dates - check-out before or equal check-in date', () => {
    cy.visit('http://localhost:5173/');
    
    cy.get('[data-testid="checkin__field"]').type('2024-01-19');
    cy.get('[data-testid="checkout__field"]').type('2024-01-18');
    cy.get('[data-testid="dates__confirm--btn"]').click();

    cy.get('[data-testid="error__endDate"]').should('exist');

    cy.get('[data-testid="checkin__field"]').type('2024-01-19');
    cy.get('[data-testid="checkout__field"]').type('2024-01-19');
    cy.get('[data-testid="dates__confirm--btn"]').click();

    cy.get('[data-testid="error__endDate"]').should('exist');
  })

  it('should display errors trying to input invalid dates - checkin after checkout', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid="checkin__field"]').type('2024-01-19');
    cy.get('[data-testid="checkout__field"]').type('2024-01-18');
    cy.get('[data-testid="dates__confirm--btn"]').click();

    cy.get('[data-testid="error__endDate"]').should('exist');
    cy.get('[data-testid="error__beginDate"]').should('exist');
  })

  it('should create booking', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid="checkin__field"]').type('2024-01-18');
    cy.get('[data-testid="checkout__field"]').type('2024-01-19');
    cy.get('[data-testid="dates__confirm--btn"]').click();
    cy.get('[data-testid="modal__button--confirm"]').click();
    cy.get('[data-testid="button__navbar--listing"]').click();

    cy.contains('2024-01-18');
    cy.contains('2024-01-19');
  })
})