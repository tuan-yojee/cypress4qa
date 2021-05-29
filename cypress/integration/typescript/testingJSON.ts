// https://filiphric.com/reading-and-testing-json-object-in-cypress
it('JSON Array', () => {
    cy
        .fixture('cars')
        .then((cars) => {
            // expect(car.color).to.eq("red")
            // expect(car.id).to.eq(4)
            // expect(car.available).to.eq(false)
            // cars.forEach(car => {
            //     cy.log(car['color'])
            //     cy.log(car['id'])
            //     console.log(car['color'])
            //     console.log(car['id'])
            // });

            // expect(cars[1]['color']).to.eq('blue')

            expect(cars[0]['features']).to.deep.eq([
                "speed limiter",
                "panoramic windshield",
                "automatic transmission"
            ])
            
            expect(cars[0].features).to.eq(["speed limiter", "panoramic windshield", "automatic transmission"])

          
            console.log(cars)
        })
})
