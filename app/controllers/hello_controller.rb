# coding: utf-8

class HelloController < ApplicationController

  def index
    @page_name = "Harta punctelor de reciclare | "
    @page_description = "Harta punctelor de reciclare la care oricine poate contribui"
    @wrapped = true
  end

  def map
    @page_name = "Harta | "
    @page_description = "Găsește un punct de reciclare pe hartă"
  end

  def about
    @page_name = "Despre | "
    @page_description = "Despre yesil-harita"
    @wrapped = true
  end

end