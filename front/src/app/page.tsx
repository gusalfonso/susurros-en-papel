"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

interface ArticleImage {
  id: number;
  attributes: {
    url: string;
    alternativeText: string;
  };
}

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    writer: {
      data: {
        attributes: {
          name: string;
        };
      };
    }
    img: {
      data: ArticleImage[];
    };
    imgurl: string;
    content: {
      type: string;
      children: {
        type: string;
        text: string;
      }[];
    }[];
  };
}

interface ApiResponse {
  data: Article[];
}

export default function BlogHomepage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
    const fetchArticles = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_API_URL}/articles?populate=*`
        );
        const sortedArticles = response.data.data.sort(
          (a, b) => new Date(b.attributes.createdAt).getTime() - new Date(a.attributes.createdAt).getTime()
        );
        setArticles(sortedArticles);
        setIsLoading(false);
      } catch (error) {
        setError(
          "Error al cargar los artículos. Por favor, intenta de nuevo más tarde."
        );
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);


  // Evita la renderización hasta que el componente esté montado
  if (!mounted) return null;

  if (isLoading) return <div className="text-center py-10">Cargando...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500" role="alert">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 flex justify-between items-center text-center">
          <div className="text-center w-full">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mx-16 sm:mx-0">
              Susurros en Papel
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Susurros de Papel es un rincón íntimo donde las palabras cobran
              vida. Aquí, los cuentos, relatos y poemas se entrelazan para dar
              voz a las emociones más profundas y a las historias que residen en
              el alma. Cada susurro es una invitación a perderse en mundos de
              fantasía, reflexionar sobre la naturaleza humana y dejarse llevar
              por la magia de la escritura. Bienvenido a un espacio donde las
              palabras son suaves, pero su eco es eterno.
            </p>
          </div>
          <ThemeToggle />
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.id} className="flex flex-col overflow-hidden">
              <div className="relative h-48 w-full overflow-hidden flex justify-center items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${article.attributes.imgurl}`}
                  alt={
                    article.attributes.img.data[0].attributes.alternativeText ||
                    article.attributes.title
                  }
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="flex-grow">
                <CardTitle className="text-xl">
                  {article.attributes.title}
                </CardTitle>
              {article && (
                <span className="text-sm text-muted-foreground">
                  Por {article.attributes.writer.data.attributes.name}
                </span>
              )}
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">
                  {article.attributes.description}
                </p>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">
                    {new Date(
                      article.attributes.createdAt
                    ).toLocaleDateString()}
                  </Badge>
                  <Link href={`/${article.attributes.slug}`} passHref>
                    <Button variant="outline">Leer más</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
