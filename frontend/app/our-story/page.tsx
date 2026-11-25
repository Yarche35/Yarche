
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function OurStory() {
  return (
    <main
      className="min-h-screen"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="pt-20 md:pt-28 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-14 lg:gap-24 items-center">

            {/* Text */}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p
                className="text-xs md:text-sm uppercase tracking-[4px] mb-8"
                style={{ color: "var(--text-secondary)" }}
              >
                Our Story
              </p>

              <h1
                className="font-serif font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95]"
                style={{ color: "var(--foreground)" }}
              >
                Built over
                <br />
                <span style={{ color: "var(--secondary)" }}>
                  generations.
                </span>
              </h1>

              <p
                className="mt-10 max-w-xl text-lg md:text-xl leading-8 md:leading-9"
                style={{ color: "var(--text-secondary)" }}
              >
                What began with a small business in 2013 has grown into
                something much more meaningful — a family journey built on
                quality, relationships and the trust of our customers.
              </p>

              <p
                className="mt-6 text-sm uppercase tracking-[3px]"
                style={{ color: "var(--text-secondary)" }}
              >
                Since 2013
              </p>
            </motion.div>

            {/* Image */}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <div
                className="overflow-hidden"
                style={{
                  background: "var(--surface)",
                }}
              >
                <Image
                  src="/Ujjwal.webp"
                  alt="Ujjwal"
                  width={900}
                  height={1100}
                  priority
                  className="w-full h-[520px] md:h-[680px] object-cover object-center"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* INTRODUCTION */}
      {/* ================================================= */}

      <section
        className="border-y py-20 md:py-28"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-4xl mx-auto px-6">

          <p
            className="text-xs uppercase tracking-[4px] mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            The Beginning
          </p>

          <h2
            className="font-serif text-4xl md:text-6xl leading-tight"
            style={{ color: "var(--foreground)" }}
          >
            I didn't start the business.
            <br />
            I grew up with it.
          </h2>

          <div
            className="mt-12 space-y-7 text-lg md:text-xl leading-8 md:leading-9"
            style={{ color: "var(--text-secondary)" }}
          >
            <p>
              People often ask me when I started my business. The simple
              answer is that I did not start it myself. I grew up watching it
              become a part of our family.
            </p>

            <p>
              In <strong style={{ color: "var(--foreground)" }}>2013</strong>,
              my father started{" "}
              <strong style={{ color: "var(--foreground)" }}>
                UJJWAL KITCHEN KING PRODUCT
              </strong>{" "}
              with a simple idea — provide quality kitchenware and household
              products while building genuine relationships with customers and
              retailers.
            </p>

            <p>
              At that time, I was just a child. I did not understand business
              in the way I do today. But I was able to see something much more
              important: customers returning, relationships becoming stronger,
              and a business slowly growing through trust.
            </p>
          </div>

        </div>
      </section>

      {/* ================================================= */}
      {/* 2013 */}
      {/* ================================================= */}

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">

            <div>
              <Image
                src="/banner1.webp"
                alt="UJJWAL KITCHEN KING PRODUCT"
                width={900}
                height={1000}
                className="w-full h-[500px] md:h-[650px] object-cover"
              />
            </div>

            <div className="lg:pt-10">

              <p
                className="text-xs uppercase tracking-[4px] mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                2013
              </p>

              <h2
                className="font-serif text-4xl md:text-6xl leading-tight"
                style={{ color: "var(--foreground)" }}
              >
                Where it all
                <br />
                began.
              </h2>

              <div
                className="w-16 h-px my-8"
                style={{ background: "var(--foreground)" }}
              />

              <div
                className="space-y-7 text-lg leading-8"
                style={{ color: "var(--text-secondary)" }}
              >
                <p>
                  Every business has a beginning. Ours started with honesty,
                  hard work and a commitment to quality.
                </p>

                <p>
                  My father believed that a business was not built simply by
                  selling products. It was built by keeping promises,
                  understanding customers and delivering value consistently.
                </p>

                <p>
                  Those principles became the foundation of UJJWAL KITCHEN KING
                  PRODUCT and continue to influence the way we work today.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* 2015 */}
      {/* ================================================= */}

      <section
        className="py-24 md:py-32"
        style={{ background: "var(--surface)" }}
      >
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">

            <div className="lg:order-2">
              <Image
                src="/handmade.webp"
                alt="Learning the Business"
                width={900}
                height={1000}
                className="w-full h-[500px] md:h-[650px] object-cover"
              />
            </div>

            <div className="lg:order-1 lg:pt-10">

              <p
                className="text-xs uppercase tracking-[4px] mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                2015
              </p>

              <h2
                className="font-serif text-4xl md:text-6xl leading-tight"
                style={{ color: "var(--foreground)" }}
              >
                Learning the
                <br />
                business.
              </h2>

              <div
                className="w-16 h-px my-8"
                style={{ background: "var(--foreground)" }}
              />

              <div
                className="space-y-7 text-lg leading-8"
                style={{ color: "var(--text-secondary)" }}
              >
                <p>
                  By 2015, I had started spending more time understanding the
                  business around me.
                </p>

                <p>
                  I was not thinking about becoming an entrepreneur. I was
                  simply learning from my father and observing how he dealt
                  with customers, retailers and everyday challenges.
                </p>

                <p>
                  Watching customers return again and again made one thing
                  clear to me: long-term business is built through
                  relationships, consistency and trust.
                </p>

                <p>
                  Those years became an education that no classroom could
                  provide. Every customer interaction and every challenge
                  gradually shaped how I think about business.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* VALUES */}
      {/* ================================================= */}

      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">

          <p
            className="text-xs uppercase tracking-[4px] mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            What We Learned
          </p>

          <h2
            className="font-serif text-4xl md:text-6xl leading-tight"
            style={{ color: "var(--foreground)" }}
          >
            The lessons were simple.
            <br />
            But they stayed with us.
          </h2>

          <div className="mt-16 space-y-14">

            <div>
              <h3
                className="font-serif text-3xl md:text-4xl"
                style={{ color: "var(--foreground)" }}
              >
                Trust
              </h3>

              <p
                className="mt-4 text-lg leading-8 max-w-2xl"
                style={{ color: "var(--text-secondary)" }}
              >
                Trust takes time. It comes from being honest, keeping
                commitments and treating every customer relationship seriously.
              </p>
            </div>

            <div>
              <h3
                className="font-serif text-3xl md:text-4xl"
                style={{ color: "var(--foreground)" }}
              >
                Quality
              </h3>

              <p
                className="mt-4 text-lg leading-8 max-w-2xl"
                style={{ color: "var(--text-secondary)" }}
              >
                The product matters, but so does the experience around it.
                Quality has always been an important part of what we promise
                our customers.
              </p>
            </div>

            <div>
              <h3
                className="font-serif text-3xl md:text-4xl"
                style={{ color: "var(--foreground)" }}
              >
                Consistency
              </h3>

              <p
                className="mt-4 text-lg leading-8 max-w-2xl"
                style={{ color: "var(--text-secondary)" }}
              >
                A business grows through the small things done correctly,
                repeatedly and with the same level of care.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================================================= */}
      {/* GROWING TOGETHER */}
      {/* ================================================= */}

      <section
        className="py-24 md:py-32"
        style={{ background: "var(--surface)" }}
      >
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">

            <div>
              <Image
                src="/handmade2.webp"
                alt="Growing Together"
                width={900}
                height={1100}
                className="w-full h-[500px] md:h-[680px] object-cover"
              />
            </div>

            <div className="lg:pt-10">

              <p
                className="text-xs uppercase tracking-[4px] mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                Growing Together
              </p>

              <h2
                className="font-serif text-4xl md:text-6xl leading-tight"
                style={{ color: "var(--foreground)" }}
              >
                More than
                <br />
                products.
              </h2>

              <div
                className="w-16 h-px my-8"
                style={{ background: "var(--foreground)" }}
              />

              <div
                className="space-y-7 text-lg leading-8"
                style={{ color: "var(--text-secondary)" }}
              >
                <p>
                  Over the years, our offline network continued to grow across
                  different markets. Retailers, customers and business
                  relationships became an important part of our story.
                </p>

                <p>
                  We never looked at success only through the number of
                  products sold. For us, a returning customer or a retailer
                  continuing a relationship was just as important.
                </p>

                <p>
                  That experience gave us confidence to think beyond our
                  existing markets and eventually take our next step.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* YARCHE */}
      {/* ================================================= */}

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">

            <div className="lg:pt-10">

              <p
                className="text-xs uppercase tracking-[4px] mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                The Next Chapter
              </p>

              <h2
                className="font-serif text-4xl md:text-6xl leading-tight"
                style={{ color: "var(--foreground)" }}
              >
                The birth
                <br />
                of Yarche.
              </h2>

              <div
                className="w-16 h-px my-8"
                style={{ background: "var(--foreground)" }}
              />

              <div
                className="space-y-7 text-lg leading-8"
                style={{ color: "var(--text-secondary)" }}
              >
                <p>
                  Years of offline experience made us think about the next
                  step. We wanted to take the same approach to quality,
                  relationships and customer service beyond our local markets.
                </p>

                <p>
                  That idea became{" "}
                  <strong style={{ color: "var(--foreground)" }}>
                    Yarche
                  </strong>
                  .
                </p>

                <p>
                  Yarche is our digital identity — built on the experience we
                  have gained since 2013 and the relationships that helped us
                  reach this point.
                </p>

                <p>
                  Moving online did not mean leaving our roots behind. It meant
                  finding a new way to carry those values forward.
                </p>
              </div>

            </div>

            <div>
              <Image
                src="/handmade3.webp"
                alt="Yarche"
                width={900}
                height={1100}
                className="w-full h-[500px] md:h-[680px] object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* 2026 */}
      {/* ================================================= */}

      <section
        className="border-y py-24 md:py-32"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-4xl mx-auto px-6">

          <p
            className="text-xs uppercase tracking-[4px] mb-6"
            style={{ color: "var(--text-secondary)" }}
          >
            2026
          </p>

          <h2
            className="font-serif text-4xl md:text-6xl leading-tight"
            style={{ color: "var(--foreground)" }}
          >
            A new identity.
            <br />
            The same values.
          </h2>

          <div
            className="w-16 h-px my-8"
            style={{ background: "var(--foreground)" }}
          />

          <div
            className="space-y-7 text-lg md:text-xl leading-8 md:leading-9"
            style={{ color: "var(--text-secondary)" }}
          >
            <p>
              In <strong style={{ color: "var(--foreground)" }}>2026</strong>,
              our journey entered another chapter as{" "}
              <strong style={{ color: "var(--foreground)" }}>
                UJJWAL KITCHEN KING PRODUCT
              </strong>{" "}
              evolved into{" "}
              <strong style={{ color: "var(--foreground)" }}>
                Ujjwal Household Pvt. Ltd.
              </strong>
            </p>

            <p>
              The change represents more than a new name. It reflects our
              intention to build stronger systems, explore new opportunities
              and create a future-ready business while remaining connected to
              the values on which everything began.
            </p>
          </div>

        </div>
      </section>

      {/* ================================================= */}
      {/* TODAY */}
      {/* ================================================= */}

      <section className="py-24 md:py-36">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <p
            className="text-xs uppercase tracking-[4px]"
            style={{ color: "var(--text-secondary)" }}
          >
            Today
          </p>

          <h2
            className="font-serif text-5xl md:text-7xl leading-tight mt-8"
            style={{ color: "var(--foreground)" }}
          >
            The story is still
            <br />
            being written.
          </h2>

          <div
            className="mt-12 space-y-7 text-lg md:text-xl leading-8 md:leading-9 max-w-3xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            <p>
              Today, every order and every customer relationship is connected
              to a journey that began back in 2013.
            </p>

            <p>
              We have changed, learned and grown along the way, but the
              foundation remains the same: quality, honesty and respect for the
              people who choose to do business with us.
            </p>

            <p>
              From our father's first steps in the business to the digital
              journey of Yarche today, this is a story that is still evolving.
            </p>
          </div>

        </div>
      </section>

      {/* ================================================= */}
      {/* FINAL */}
      {/* ================================================= */}

      <section className="pb-28 md:pb-40">
        <div className="max-w-4xl mx-auto px-6">

          <div
            className="border-t pt-12 md:pt-16"
            style={{ borderColor: "var(--border)" }}
          >

            <p
              className="font-serif text-3xl md:text-5xl leading-tight"
              style={{ color: "var(--foreground)" }}
            >
              It started with a family,
              <br />
              a business and a belief
              <br />
              in doing things well.
            </p>

            <p
              className="mt-8 text-lg leading-8 max-w-2xl"
              style={{ color: "var(--text-secondary)" }}
            >
              More than a decade later, we are still learning, still growing
              and still building on the same foundation.
            </p>

            <p
              className="mt-10 text-sm uppercase tracking-[4px]"
              style={{ color: "var(--text-secondary)" }}
            >
              Ujjwal Household Pvt. Ltd. · Since 2013
            </p>

          </div>

        </div>
      </section>

    </main>
  );
}

