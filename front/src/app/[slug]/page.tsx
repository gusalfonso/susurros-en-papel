/* eslint-disable @next/next/no-img-element */
"use-client";
import { notFound } from "next/navigation";

import axios from "axios";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  Key,
} from "react";

async function getArticle(slug: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/articles?filters[slug]=${slug}&populate=*`
    );
    return response.data.data[0];
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  const { title, content, createdAt, img, imgurl, writer } = article.attributes;

  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      <div className="container mx-auto px-4 py-8">
        <Link href="/" passHref>
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al inicio
          </Button>
        </Link>
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{title}</CardTitle>
            <div className="flex justify-between items-center mt-4">
              <Badge variant="secondary">
                {format(new Date(createdAt), "d 'de' MMMM, yyyy", {
                  locale: es,
                })}
              </Badge>
              {writer && (
                <span className="text-sm text-muted-foreground">
                  Por {writer.data.attributes.name}
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {img && img.data && img.data[0] && (
              <div className="relative w-full h-60 mb-6 flex justify-center">
                <img
                  src={`${imgurl}`}
                  alt={img.data[0].attributes.alternativeText || title}
                  className="rounded-lg object-cover"
                />
              </div>
            )}
            <div className="prose dark:prose-invert max-w-none">
              {content.map(
                (
                  paragraph: {
                    children: {
                      text:
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactElement<any, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | ReactPortal
                        | Promise<AwaitedReactNode>
                        | null
                        | undefined;
                    }[];
                  },
                  index: Key | null | undefined
                ) => (
                  <p key={index} className="mb-4">
                    {paragraph.children[0].text}{" "}
                  </p>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
