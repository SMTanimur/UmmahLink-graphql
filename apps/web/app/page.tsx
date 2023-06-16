"use client"

import { useMeQuery } from "@social-zone/graphql";
import { Metadata } from "next";
import Link from "next/link";
import WithoutUser from "./home/WithoutUser";
import { useAuth } from "@social-zone/client";


const HomePage = () => {


  const {data}=useMeQuery()
  const {isAuthenticated}=useAuth()

  if( !(isAuthenticated)) return <WithoutUser/>

   
   return (
     <>
     <div className="top-5">
      <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum aut nam, dignissimos veritatis vel nemo tempore nulla error voluptatibus expedita, natus dolores. Natus, ipsa inventore. Ad sapiente inventore a ipsa praesentium commodi velit ab voluptatibus illum assumenda, error nesciunt. Delectus quae quam dolorem animi eveniet dignissimos eius officia impedit debitis ducimus excepturi corporis, vel modi odit molestiae consequatur temporibus repudiandae voluptatibus iusto neque assumenda. Doloremque sint neque, sit ducimus laudantium aliquam maiores magnam totam labore vero nostrum illum autem nesciunt saepe voluptatibus quam blanditiis at commodi, unde enim qui molestiae, molestias fuga hic. Facilis animi deserunt placeat eum quod assumenda, laboriosam debitis rem accusantium. Magnam et, consequuntur beatae vero accusamus nesciunt nobis obcaecati aliquid corrupti totam deleniti molestiae tempore hic ratione expedita, laboriosam quas, delectus dignissimos. Perferendis consectetur similique officiis reiciendis enim a optio? Labore dignissimos incidunt molestiae tempora eum itaque iste aliquid hic libero nesciunt quis provident, modi harum! Vel ad facere, porro eum veniam saepe neque debitis blanditiis itaque libero, mollitia eveniet autem necessitatibus fugit eaque, quis accusantium tenetur minus quos repellat pariatur! Exercitationem doloremque similique voluptas quod debitis reiciendis quisquam quae cum, laudantium magnam eveniet aliquid numquam? Facere, incidunt? Dolorem aut dolorum expedita! Vitae omnis doloribus dolor.</h1>
     </div>
     
     </>
  )
};

export default HomePage;
export const metadata: Metadata = {
  title: 'Home'
}
