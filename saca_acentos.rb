#!/usr/bin/env ruby
# encoding: utf-8

require 'rubygems'
require 'open-uri'
require 'digest/md5'
require 'net/http'
require 'net/https' if RUBY_VERSION < '1.9'
require 'uri'
require 'json'
require 'active_support/core_ext'
require 'fileutils'

FILENAME = File.expand_path('../', __FILE__) + '/tabla.json'

def remove_accents(str)
  accents = {
    ['á','à','â','ä','ã'] => 'a',
    ['Ã','Ä','Â','À','Á'] => 'A',
    ['é','è','ê','ë'] => 'e',
    ['Ë','É','È','Ê'] => 'E',
    ['í','ì','î','ï'] => 'i',
    ['Î','Ì','Í'] => 'I',
    ['ó','ò','ô','ö','õ'] => 'o',
    ['Õ','Ö','Ô','Ò','Ó'] => 'O',
    ['ú','ù','û','ü'] => 'u',
    ['Ú','Û','Ù','Ü'] => 'U',
    ['ç'] => 'c', ['Ç'] => 'C'
    # ['ñ'] => 'n', ['Ñ'] => 'N'
  }
  accents.each do |ac,rep|
    ac.each do |s|
      str = str.gsub(s, rep)
    end
  end
  str = str.gsub(/[^a-zA-Z0-9ñÑ:%()\-\/\. ]/,"")
  str = str.gsub(/[ ]+/," ")
  # str = str.gsub(/ /,"-")
  str = str.titleize
end

def saca_acentos
  sheison = JSON.parse(File.read(FILENAME), symbolize_names: true)
  sheison[:data].each { |x| x[:autor] = remove_accents(x[:autor]) }
  sheison[:data].each { |x| x[:titulo] = remove_accents(x[:titulo]) }
  FileUtils.cp FILENAME, FILENAME + '.sa.bak'
  File.open(FILENAME, 'w') do |f|
    f.write(JSON.pretty_generate(sheison))
  end
end

if File.exist?(FILENAME)
  saca_acentos
  # puts remove_accents("EL CRACK-UP")
else
  puts "No existe tabla.json"
end
