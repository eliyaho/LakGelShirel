import Image from "next/image"

export default function About() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="שיראל - מייסדת לק גל שלי"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">אודות לק גל שלי שיראל</h2>
            <p className="text-gray-600 mb-4">
              לק גל שיראל נוסד מתוך אהבה לאמנות הציפורניים ותשוקה ליופי. המייסדת שלנו, שיראל, החלה את דרכה כמעצבת
              ציפורניים מקצועית וחלמה ליצור מותג שיביא את הקסם של סלון הציפורניים הביתה לכל אישה.
            </p>
            <p className="text-gray-600">
              אנו מאמינים שכל אישה ראויה להרגיש יפה ובטוחה בעצמה. המוצרים שלנו מיוצרים מחומרים איכותיים ביותר, ידידותיים
              לסביבה ולא נבדקו על בעלי חיים. הצטרפי אלינו במסע לגלות את היופי הייחודי שלך!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

