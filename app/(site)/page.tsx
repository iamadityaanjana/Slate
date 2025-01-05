import TitleSection from "@/components/landing-page/title-section"
import Image from "next/image"
import AppDemo from "@/public/AppDemo.png"
import FeatureSection from "@/components/landing-page/feature-section"
import CustomCard from "@/components/landing-page/custom-card"
import { PRICING_CARDS, PRICING_PLANS } from "@/lib/constants"
import clsx from "clsx"
import { Button } from "@/components/ui/button"
import { CardContent, CardTitle } from "@/components/ui/card"
import Diamond from '@/public/Diamond.svg';
import Check from '@/public/Check.svg'

const Homepage=()=>{
    return(
        <>
        <section className="overflow-hidden
         px-4
         sm:px-6
         mt-10
         sm:flex
         sm:flex-col
         gap-4
         md:justify-center
         md:items-center">
           <TitleSection pill="A perfect collaborative workspace✨" 
           title="Write ✍️, organize 📚, collaborate 🤝 because great ideas start here."></TitleSection>
           <div className="bg-white
           p-[2px]
           mt-6
           rounded-xl
           bg-gradient-to-r
           from-primary
           to-brand-primaryBlue
           md:w-[300px]
           ">
            <button
            className="w-full
            rounded-[10px]
            p-2
            text-2xl
            bg-background"
            >Get Slate Now!</button>
           </div>
           <div className="
           sm:w-full
           w-[750px]
           flex
           justify-center
           relative
           sm:ml-0
           ml-[-50px]">
            <Image
            src={AppDemo}
            alt="App demo image"></Image>
           </div>
        </section>
        <section className="px-4
         sm:px-6
         mt-10
         sm:flex
         sm:flex-col
         gap-10
         md:justify-center
         md:items-center">
            <FeatureSection pill="features"
            title="Smart Note-Taking"
            subheading="Capture your ideas quickly and keep them organized effortlessly."></FeatureSection>

            <FeatureSection pill="" title="Real-Time Collaboration" subheading="Work seamlessly with your team, wherever they are."></FeatureSection>
            
            <FeatureSection pill="" title="Rich Text Editing" subheading="Style your notes your way with bold, highlights, checklists, and more">
            </FeatureSection>
        </section>
        <section
        className="mt-20
        px-4
        sm:px-6
      "
      >
        <TitleSection
          title="The Perfect Plan For You"
          subheading="Experience all the benefits of our platform. Select a plan that suits your needs and take your productivity to new heights."
          pill="Pricing"
        />
        <div
          className="flex 
        flex-col-reverse
        sm:flex-row
        gap-4
        justify-center
        sm:items-stretch
        items-center
        mt-10
        "
        >
          {PRICING_CARDS.map((card) => (
            <CustomCard
              key={card.planType}
              className={clsx(
                'w-[300px] rounded-2xl dark:bg-black/40 background-blur-3xl relative',
                {
                  'border-brand-primaryPurple/70':
                    card.planType === PRICING_PLANS.proplan,
                }
              )}
              cardHeader={
                <CardTitle
                  className="text-2xl
                  font-semibold
              "
                >
                  {card.planType === PRICING_PLANS.proplan && (
                    <>
                      <div
                        id="pricing"
                        className="hidden dark:block w-full blur-[120px] rounded-full h-32
                        absolute
                        bg-brand-primaryPurple/80
                        -z-10
                        top-0
                      "
                      />
                      <Image
                        src={Diamond}
                        alt="Pro Plan Icon"
                        className="absolute top-6 right-6"
                      />
                    </>
                  )}
                  {card.planType}
                </CardTitle>
              }
              cardContent={
                <CardContent className="p-0">
                  <span
                    className="font-normal 
                    text-2xl
                "
                  >
                    ${card.price}
                  </span>
                  {+card.price > 0 ? (
                    <span className="dark:text-washed-purple-800 ml-1">
                      /mo
                    </span>
                  ) : (
                    ''
                  )}
                  <p className="dark:text-washed-purple-800">
                    {card.description}
                  </p>
                  <Button
                    className="whitespace-nowrap w-full mt-4"
                  >
                    {card.planType === PRICING_PLANS.proplan
                      ? 'Go Pro'
                      : 'Get Started'}
                  </Button>
                </CardContent>
              }
              cardFooter={
                <ul
                  className="font-normal
                  flex
                  mb-2
                  flex-col
                  gap-4
                "
                >
                  <small>{card.highlightFeature}</small>
                  {card.freatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex
                      items-center
                      gap-2
                    "
                    >
                      <Image
                        src={Check}
                        alt="Check Icon"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              }
            />
          ))}
        </div>
      </section>
        </>
    )
}
export default Homepage