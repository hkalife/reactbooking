import { format, addDays } from 'date-fns'

describe('Booking - Add booking', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  const fillCreateDatesAndConfirm = (checkin: string, checkout: string) => {
    cy.get('[data-testid="checkin__field"]').type(checkin);
    cy.get('[data-testid="checkout__field"]').type(checkout);
    cy.get('[data-testid="dates__confirm--btn"]').click();
    cy.get('[data-testid="modal__button--confirm"]').click();
  };

  const fillEditDatesAndConfirm = (checkin: string, checkout: string, index: number) => {
    cy.get(`[data-testid="edit__result--${index}"]`).click();
    cy.get(`[data-testid="edit__checkin--${index}"]`).type(checkin);
    cy.get(`[data-testid="edit__checkout--${index}"]`).type(checkout);
    cy.get(`[data-testid="confirm__edit--${index}"]`).click();
  };

  it('should create booking', () => {
    fillCreateDatesAndConfirm(format(new Date(), 'yyyy-MM-dd'), format(addDays(new Date(), 2), 'yyyy-MM-dd'))
    cy.get('[data-testid="button__navbar--listing"]').click();
    cy.get('[data-testid="listing__result--0"]').should('exist');
  })

  it('should update and delete booking', () => {
    fillCreateDatesAndConfirm(
      format(new Date(), 'yyyy-MM-dd'), format(addDays(new Date(), 2), 'yyyy-MM-dd')
    )
    fillCreateDatesAndConfirm(
      format(addDays(new Date(), 3), 'yyyy-MM-dd'), format(addDays(new Date(), 4), 'yyyy-MM-dd')
    )
    fillCreateDatesAndConfirm(
      format(addDays(new Date(), 5), 'yyyy-MM-dd'), format(addDays(new Date(), 6), 'yyyy-MM-dd')
    )

    cy.get('[data-testid="button__navbar--listing"]').click();

    cy.get('[data-testid="listing__result--0"]').should('exist');
    cy.get('[data-testid="listing__result--1"]').should('exist');
    cy.get('[data-testid="listing__result--2"]').should('exist');

    fillEditDatesAndConfirm('2024-02-03', '2024-02-07', 1)

    cy.contains('2024-02-03');
    cy.contains('2024-02-07');

    cy.contains('2024-01-21').should('not.exist');
    cy.contains('2024-01-25').should('not.exist');

    cy.get('[data-testid="delete__result--1"]').click();
    cy.get('[data-testid="modal__button--confirm"').click();

    cy.contains('2024-02-03').should('not.exist');
    cy.contains('2024-02-07').should('not.exist');
  })

  it('should display errors - empty dates', () => {
    cy.get('[data-testid="dates__confirm--btn"]').click();

    cy.get('[data-testid="error__beginDate"]').should('exist');
    cy.get('[data-testid="error__endDate"]').should('exist');
  })

  it('should display errors - past check-in dates (create/edit)', () => {
    cy.get('[data-testid="checkin__field"]').type('2020-01-01');
    cy.get('[data-testid="dates__confirm--btn"]').click();

    cy.get('[data-testid="error__beginDate"]').should('exist');

    fillCreateDatesAndConfirm(format(new Date(), 'yyyy-MM-dd'), format(addDays(new Date(), 2), 'yyyy-MM-dd'))
    cy.get('[data-testid="button__navbar--listing"]').click();
    cy.get('[data-testid="edit__result--0"]').click();

    cy.get('[data-testid="edit__checkin--0"]').type('2020-01-01');
    cy.get('[data-testid="confirm__edit--0"]').click();
  })

  it('should display errors - check-out before check-in date (create/edit)', () => {

    cy.get('[data-testid="checkin__field"]').type(format(addDays(new Date(), 2), 'yyyy-MM-dd'));
    cy.get('[data-testid="checkout__field"]').type(format(new Date(), 'yyyy-MM-dd'));
    cy.get('[data-testid="dates__confirm--btn"]').click();

    fillCreateDatesAndConfirm(format(new Date(), 'yyyy-MM-dd'), format(addDays(new Date(), 2), 'yyyy-MM-dd'))
    cy.get('[data-testid="button__navbar--listing"]').click();
    cy.get('[data-testid="edit__result--0"]').click();
    
    cy.get('[data-testid="edit__checkin--0"]').type(format(addDays(new Date(), 0), 'yyyy-MM-dd'));
    cy.get('[data-testid="edit__checkout--0"]').type(format(addDays(new Date(), 2), 'yyyy-MM-dd'));
    cy.get('[data-testid="confirm__edit--0"]').click();
  })

  it('should display errors - overlapping bookings (create/edit)', () => {
    fillCreateDatesAndConfirm(format(new Date(), 'yyyy-MM-dd'), format(addDays(new Date(), 2), 'yyyy-MM-dd'))
    cy.get('[data-testid="checkin__field"]').type(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
    cy.get('[data-testid="checkout__field"]').type(format(addDays(new Date(), 3), 'yyyy-MM-dd'));
    cy.get('[data-testid="dates__confirm--btn"]').click();

    cy.get('[data-testid="modal__component"]').should('exist');
    cy.get('[data-testid="icon__modal--warning"]').should('exist');
    cy.get('[data-testid="modal__button--cancel"]').click();

    fillCreateDatesAndConfirm(format(addDays(new Date(), 3), 'yyyy-MM-dd'), format(addDays(new Date(), 4), 'yyyy-MM-dd'))
    cy.get('[data-testid="button__navbar--listing"]').click();
    cy.get('[data-testid="edit__result--0"]').click();

    cy.get('[data-testid="edit__checkin--0"]').type(format(addDays(new Date(), 3), 'yyyy-MM-dd'));
    cy.get('[data-testid="edit__checkout--0"]').type(format(addDays(new Date(), 5), 'yyyy-MM-dd'));
    cy.get('[data-testid="confirm__edit--0"]').click();

    cy.get('[data-testid="modal__component"]').should('exist');
    cy.get('[data-testid="icon__modal--warning"]').should('exist');
  })
})