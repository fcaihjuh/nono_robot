<?php

namespace nono\controleur;
use Slim\Container;
use nono\modele\Item;
use nono\vue\VueParticipant;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class Controleur
{
    private $c;
    private $htmlvars;

    public function __construct(Container $c) {
        $this->c = $c;
        $this->htmlvars = [];
    }

    function getCollection(Request $rq, Response $rs, array $args ):Response{
        $htmlvars = [
            'basepath' => $rq->getUri()->getBasePath(),
        ];
        $vue = new VueParticipant([], $this->c);
        $this->htmlvars['basepath'] = $rq->getUri()->getPath();
        $rs->getBody()->write($vue->render($htmlvars));
        return $rs;
    }
}