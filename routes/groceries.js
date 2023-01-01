const {Router, request, response} = require ('express')
const router = Router()

const groceriesList = [
    {
        item: 'milk',
        quantity: 2,
    },
    {
        item: 'cereal',
        quantity: 5,
    },
    {
        item: 'cocopops',
        quantity: 9,
    },
]


router.use((req,res, next)=>{
    console.log("Inside Groceries Auth check midleware");
    console.log(req.user);
    if(req.user) next()
    else res.send(401)
    
})

router.get('/', (request, response)=>{
    response.send(groceriesList)
}),


router.get('/:item',(request, response)=>{
    console.log(request.cookies);
    const { item } = request.params
    const groceryItem = groceriesList.find((g)=>
        g.item === item)
        response.send(groceryItem)
    })

    
router.post('/', (request, response)=>{
        console.log(request.body);
        groceriesList.push(request.body)
        response.send(201)
    })


router.get('shopping/cart', (request, response)=>{ 
    const {cart} = request.session
    console.log('cart');
    if(!cart){
        response.send('You have no cart session')
    }else{
        response.send(cart)
    }
})


router.post('/shopping/cart/item', (request, response)=>{
        const {item, quantity} = request.body
        const cartItem = {item, quantity}
        const {cart} = request.session
        if(cart){
            request.session.cart.items.push(cartItem)
        }else{
            request.session.cart = {
                items: [cartItem]
            }
        }
        response.send(201)
    })
module.exports = router