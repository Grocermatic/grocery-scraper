import GroceryCard from "@/components/cards/GroceryCard"

const Home = () => {
  const productInfos = [
    {
      "name": "Woolworths Baby Spinach Spinach",
      "url": "https://www.woolworths.com.au/shop/productdetails/524336",
      "img": "https://cdn0.woolworths.media/content/wowproductimages/large/524336.jpg",
      "price": 4.5,
      "quantity": 0.28,
      "unitPrice": 16.07,
      "nutrition": {
        "servingSize": 0.07,
        "kilojoules": 83,
        "protein": 2.4,
        "fat": 1,
        "fatSaturated": 1,
        "carb": 1,
        "sugar": 1,
        "sodium": 21
      }
    },
    {
      "name": "Sausage Garlic & Herb Plant Based",
      "url": "https://www.coles.com.au/product/v2-sausage-garlic-and-herb-plant-based-390g-5708431",
      "img": "https://productimages.coles.com.au/productimages/5/5708431.jpg",
      "price": 9.5,
      "quantity": 0.39,
      "unitPrice": 24.36,
      "nutrition": {
        "servingSize": 0.065,
        "kilojoules": 1096,
        "protein": 15,
        "fat": 19.3,
        "fatSaturated": 11.2,
        "carb": 5.3,
        "sugar": 0.9,
        "sodium": 267
      }
    },
    {
      "name": "Ready, Set…Cook! RSPCA Approved Chicken Wings",
      "url": "https://www.aldi.com.au/en/groceries/super-savers/super-savers-detail/ps/p/ready-setcook-rspca-approved-chicken-wings-550g/",
      "img": "https://www.aldi.com.au/fileadmin/_processed_/c/6/csm_2723_SSV_MEAT_1x1_1_RET_32e57050a1.png",
      "price": 6.99,
      "quantity": 0.55,
      "unitPrice": 12.71
    },
    {
      "name": "Del Padrón Jamón Ibérico",
      "url": "https://www.aldi.com.au/en/groceries/super-savers/super-savers-detail/ps/p/del-padron-jamon-ibrico-70g/",
      "img": "https://www.aldi.com.au/fileadmin/_processed_/8/0/csm_2723_SSV_MEAT_1x1_2_RET_918bc7c6d4.png",
      "price": 5.99,
      "quantity": 0.07,
      "unitPrice": 85.57
    },
    {
      "name": "The Fishmonger Wild Fishingrod Caught Australian Snapper Fillets",
      "url": "https://www.aldi.com.au/en/groceries/super-savers/super-savers-detail/ps/p/the-fishmonger-wild-caught-australian-snapper-fill-6/",
      "img": "https://www.aldi.com.au/fileadmin/_processed_/4/7/csm_2723_SSV_MEAT_1x1_3_RET_45710588e2.png",
      "price": 9.99,
      "quantity": 0.26,
      "unitPrice": 38.42
    }
  ]
  const cards = productInfos.map((productInfo, id) => {return <GroceryCard key={id} productInfo={productInfo}/>})
  return (
    <div className="container">
      {cards}
    </div>
  )
}

export default Home